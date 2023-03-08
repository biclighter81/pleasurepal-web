export default function HeaderInteraction() {
  return (
    <>
      <div className="flex space-x-6">
        <button className="px-12 py-3 text-sm rounded-full uppercase font-semibold bg-gradient-to-br from-primary-500 to-secondary-500 hover:scale-105 transition duration-300 ease-in-out">
          Signup
        </button>
        <button className="px-12 py-3 text-sm rounded-full uppercase font-semibold bg-light-dark hover:scale-105 transition duration-300 ease-in-out">
          Login
        </button>
      </div>
    </>
  );
}
