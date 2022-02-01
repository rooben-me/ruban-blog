import Link from "next/link";
import React from "react";
import { sanityClient } from "../../sanity";

function Post({ post }) {
  return (
    <div>
      <Link href="/">Back to home</Link>
      <h1 className="text-2xl">{post.title}</h1>
    </div>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
      slug {
          current
      }
    }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        title, 
        author -> {
         name, 
         image
        },
      description,
      mainImage, 
      slug,
      body
      }
    `;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
