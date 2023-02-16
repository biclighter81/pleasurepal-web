import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import KeycloaAdminCli from "@keycloak/keycloak-admin-client";
import { encode, getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!session.discord_uid || !session.discord_username) {
    res.status(400).json({ error: "Discord account not linked!" });
    return;
  }
  try {
    const discordRes = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams([
        ["client_id", process.env.DISCORD_CLIENT_ID!],
        ["client_secret", process.env.DISCORD_CLIENT_SECRET!],
        ["grant_type", "refresh_token"!],
        ["refresh_token", session.discord_refresh_token!],
      ]),
    });
    const discordToken = await discordRes.json();
    const authToken = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
    });
    // Set discord_refresh_token in keycloak
    await updateKCDiscordRefreshToken(
      discordToken.refresh_token,
      session.discord_username,
      session.discord_uid,
      session.user.id
    );
    // Update session with new refresh token
    if (authToken) {
      const nextToken = await encode({
        secret: process.env.AUTH_SECRET!,
        token: {
          ...authToken,
          discord_refresh_token: discordToken.refresh_token,
        },
      });
      if (nextToken) {
        const resCookies = new Cookies(req, res);
        resCookies.set(
          process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token",
          nextToken,
          {
            path: "/",
          }
        );
      }
    }
    res.status(200).json(discordToken);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateKCDiscordRefreshToken(
  refreshToken: string,
  username: string,
  discordUid: string,
  userId: string
) {
  const kc = new KeycloaAdminCli({
    baseUrl: process.env.KEYCLOAK_URL!,
    realmName: process.env.KEYCLOAK_REALM!,
  });
  await kc.auth({
    grantType: "client_credentials",
    clientId: process.env.KEYCLOAK_REALM!,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  });
  await kc.users.update(
    {
      id: userId,
      realm: process.env.KEYCLOAK_REALM!,
    },
    {
      attributes: {
        discord_refresh_token: [refreshToken],
        discord_username: [username],
        discord_uid: [discordUid],
      },
    }
  );
}
