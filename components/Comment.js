import React, { useState } from "react";

import { useForm } from "react-hook-form";

function Comment({ post }) {
  const { register, handleSubmit, errors } = useForm();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => setSubmitted(true))
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <div>
      <div className="py-12 my-8 bg-white bg-opacity-50 px-4 rounded-lg">
        {submitted ? (
          <>
            <h2 className="text-center text-2xl font-semibold text-gray-800">
              Thank you for your comment :)
            </h2>
            <p className="text-center text-md mt-4 text-gray-500">
              Once it has been approved, it will appear below
            </p>
          </>
        ) : (
          <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-lg text-pink-500 mb-1">Enjoyed this artice ?</p>
            <h1 className="text-2xl text-slate-800 mb-8 font-semibold">
              Leave a comment below :)
            </h1>
            <input
              type="hidden"
              name="_id"
              value={post._id}
              {...register("_id")}
            />
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm placeholder:text-gray-300 focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="rooben"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm mt-6 font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  className="shadow-sm placeholder:text-gray-300 focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="rooben@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm mt-6 font-medium text-gray-700"
              >
                Add your comment
              </label>
              <div className="mt-1">
                <textarea
                  {...register("comment", { required: true })}
                  rows={4}
                  name="comment"
                  id="comment"
                  placeholder="something nice :)"
                  className="shadow-sm placeholder:text-gray-300 focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
            </div>

            <input
              type="submit"
              className="w-full cursor-pointer mt-7 text-center inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            />
          </form>
        )}
      </div>

      <section>
        <h2 className="text-2xl text-slate-800 font-semibold"> Comments </h2>
        {post.comments.map((comment) => (
          <div className="flex items-center space-x-2" key={comment._id}>
            <p className="font-medium text-slate-800">{comment.name} : </p>
            <span>{comment.comment}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Comment;
