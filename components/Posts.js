import Link from "next/link";
import React from "react";
import { urlfor } from "../sanity";

function Posts({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 md:gap-8 max-w-7xl mx-auto">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="px-4 group cursor-pointer">
            <div className="w-full max-w-lg overflow-hidden rounded-lg">
              <img
                src={urlfor(post.mainImage).url()}
                alt="image"
                className="aspect-video object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
            </div>
            <p className="mt-4 text-slate-500">
              {new Date(post._createdAt).toLocaleString()}
            </p>
            <h2 className="text-2xl my-4 text-slate-800 font-medium">
              {post.title}
            </h2>
            <p className="text-md text-slate-500">{post.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
