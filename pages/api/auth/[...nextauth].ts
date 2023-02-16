import NextAuth, {
  Account,
  Awaitable,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import KeycloakProvider, {
  KeycloakProfile,
} from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  events: {},
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    session(params: {
      session: Session;
      user: User | AdapterUser;
      token: any;
    }): Awaitable<Session> {
      if (params.session.user && params.token.sub) {
        params.session.user.id = params.token.sub;
      }
      // Reduce cookie size
      params.token.refresh_token = undefined;
      params.token.id_token = undefined;
      return {
        ...params.session,
        ...params.token,
      };
    },
    jwt(params: {
      token: JWT;
      user?: User | AdapterUser | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }): Awaitable<any> {
      return {
        ...params.token,
        ...params.account,
        ...params.profile,
      };
    },
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      idToken: true,
      wellKnown: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/.well-known/openid-configuration`,
      profile(profile: KeycloakProfile) {
        return {
          id: profile.sub,
          name: profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        };
      },
      authorization: {
        params: {
          scope: "openid profile email discord",
        },
      },
    }),
  ],
};

export default NextAuth(authOptions as any);
