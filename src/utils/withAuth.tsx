/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { env } from "~/env";

interface DecodedToken {
  // Define the expected structure of the decoded token payload
  // based on your authentication system
  userId: string;
  // Add other relevant properties here
}

const secret_key = env.NEXT_PUBLIC_JWT_TOKEN;

type WithAuthProps<T> = T & { user?: DecodedToken }; // Optional user for flexibility

const withAuth = <T extends {}>(
  WrappedComponent: React.FC<WithAuthProps<T>>,
) => {
  const Component = (props: WithAuthProps<T>) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login"); // Redirect to login if not authenticated
      } else {
        try {
          console.log("🚀 ~ secret_key:", token, secret_key);

          debugger;
          jwt.verify(token, secret_key, (err) => {
            if (err) {
              router.replace("/login"); // Redirect to login if token is invalid
            }
          });
        } catch (err) {
          console.log(err);
          router.replace("/login"); // Redirect on any error
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default withAuth;
