import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

//Your prisma instance will be your interface to the database when you want to read and write data in it.
import prisma from '../lib/prisma'
//Notes Cont:
// Using this, you can for example create a new User record by calling prisma.user.create() or retrieve all the Post records from the database with prisma.post.findMany().

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    // where filter is specified below to include only Post records where published is true
    where: { published: true },
    include: {
      //the name of the author of the Post record is queried as well and will be included in return objects
      author: {
        select: { name: true },
      },
    },
  });
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
