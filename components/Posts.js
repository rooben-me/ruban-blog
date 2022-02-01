import Link from "next/link";
import React from "react";
import { urlfor } from "../sanity";

function Posts({ posts }) {
  return (
    <div className="grid grid-cols-3 gap-x-8 max-w-7xl mx-auto">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:scale-110 transition-transform ease-in-out mt-8">
            <img
              src={urlfor(post.mainImage).url()}
              alt="image"
              className="w-full max-w-lg aspect-video rounded"
            />
            <div className="flex justify-between space-x-2 mt-4">
              <div>
                <p className="text-lg ">{post.title}</p>
                <p className="text-md text-gray-600">{post.description}</p>
              </div>

              <img
                src={urlfor(post.author.image.asset._ref).url()}
                alt="author profile image"
                className="rounded-full w-10 aspect-square"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
