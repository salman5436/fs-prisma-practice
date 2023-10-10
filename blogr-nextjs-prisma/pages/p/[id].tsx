//This page uses getServerSideProps(SSR) instead of getStaticProps(SSG). 
//This is because the data is dynamic, it depends on the id of the Post that's requested in the URL.
//For example, the view on route /p/42 displays the Post where id is 42

import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"

import prisma from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  //updating this function to retrieve the proper posts from the database & make it available to the frontend
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id)
    },
    include: {
      author: {
        select: { name: true }
      },
    },
  });
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
