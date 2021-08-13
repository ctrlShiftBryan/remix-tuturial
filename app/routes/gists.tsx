import React from "react";
import { json, LoaderFunction, useRouteData } from "remix";

// Define the Gist type
interface Gist {
  id: string;
  html_url: string;
  files: {
    [fileName: string]: {
      filename: string;
      type: string;
      language: string;
      raw_url: string;
      size: number;
    };
  };
}

// Load data for this route and define some caching headers so that when the
// user navigates here multiple times it won't make the request more than once
// per 300 seconds
export let loader: LoaderFunction = async () => {
  let token = "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";

  let res = await fetch("https://api.github.com/gists", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`
    }
  });

  let gists = await res.json();
  return json(gists, {
    headers: {
      "Cache-Control": "max-age=300"
    }
  });
};

// The HTTP headers for the server rendered request, just use the cache control
// from the loader.
export function headers({ loaderHeaders }: { loaderHeaders: Headers }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control")
  };
}

// The title and meta tags for the document's <head>
export function meta({data}) {
  return {
    title: "Public Gists",
    description: `View the latest ${data.length} gists from the public`
  };
}

export default function Gists() {
  let data = useRouteData<Gist[]>();

  return (
    <div>
      <h2>Public Gists</h2>
      <ul>
        {data.map((gist: any) => (
          <li key={gist.id}>
            <a href={gist.html_url}>{Object.keys(gist.files)[0]}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
