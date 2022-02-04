import Link from "next/link";
import React from "react";
import PortableText from "react-portable-text";
import Comment from "../../components/Comment";
import { sanityClient, urlfor } from "../../sanity";

function Post({ post }) {
  return (
    <div>
      <Link href="/">
        <p className="text-slate-600 cursor-pointer bg-white hover:scale-105 transition-all duration-500 px-4 py-2 rounded shadow hover:shadow-md inline-block m-4 mb-8 md:m-8">
          Back to home
        </p>
      </Link>
      <section className="container mx-auto p-4">
        <h1 className="lg:text-8xl px-4 text-5xl max-w-4xl leading-tight font-bold text-slate-800 mx-auto text-center">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-x-4 mt-8 md:mt-12 lg:mt-16">
          <div className="rounded-full overflow-hidden w-12 h-12 grid place-items-center ring ring-offset-2 ring-pink-500">
            <img
              src={urlfor(post.author.image.asset._ref).url()}
              alt="author profile pic"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg md:text-xl font-medium text-pink-500">
              {post.author.name}
            </p>
            <span className="text-slate-500 text-sm md:text-md">
              {new Date(post._createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        <article className="max-w-xl mt-16 mx-auto">
          <PortableText
            content={post.body}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            serializers={{
              h1: (props) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              h3: (props) => (
                <h3
                  className="text-2xl font-medium mb-4 mt-16 text-slate-800"
                  {...props}
                />
              ),
              li: ({ children }) => (
                <li className="ml-4 list-disc text-slate-500 mt-8 text-xl">
                  {children}
                </li>
              ),
              link: ({ href, children }) => (
                <a className="text-pink-500 hover:underline">{children}</a>
              ),
              normal: ({ children }) => (
                <p className="text-lg font-medium my-5 text-slate-600">
                  {children}
                </p>
              ),
            }}
          />
        </article>

        <Comment post={post} />
      </section>
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
        'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
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
