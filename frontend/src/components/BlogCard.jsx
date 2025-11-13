import React, { useState } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blogs }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <>
      <article className="blog-card">
        <div className="blog-image h-fit overflow-hidden rounded-lg">
          <Link to={`/blog/${blogs._id}`}>
            <img
              src={`http://localhost:8000/${blogs.image}`}
              alt="blog"
              className="w-full h-[300px] object-cover hover:scale-125 transition-all ease-in-out delay-150"
            />
          </Link>
        </div>

        <div className="blog-description pl-2">
          {/* Title with ellipsis */}
          <h2
            className="font-semibold text-md mt-2 hover:text-[##696B6B] duration-300 truncate"
            title={blogs.title} // Tooltip to show the full title on hover
            // style={{
            //   display: "-webkit-box",
            //   WebkitLineClamp: 1,
            //   WebkitBoxOrient: "vertical",
            //   overflow: "hidden",
            // }}
          >
            {blogs.title}
          </h2>

          {/* Description with "Read More" */}
          <p className="font-normal text-[#696B6B] text-sm">
            {showFullDescription
              ? blogs.description
              : `${blogs.description.slice(0, 100)}...`} {/* Adjust the character limit */}
            {blogs.description.length > 100 && (
              <span
                className="text-[#000000] cursor-pointer ml-2 font-semibold"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </span>
            )}
          </p>
        </div>
      </article>
    </>
  );
};

export default BlogCard;
