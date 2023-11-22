import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Quotastique" },
    { name: "description", content: "Welcome to Quotastique!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL is not defined");
  }

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const data = await res.json();

  return json(data);
};

export default function Index() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
        fontSize: "3rem",
        fontWeight: "700",
        lineHeight: "1.8",
      }}
    >
      <p>{message}</p>
    </div>
  );
}
