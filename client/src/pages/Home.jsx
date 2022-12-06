import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from "axios"

const Home = () => 
{
  const [posts, setPosts] = useState([])

  const [readMore, setReadMore] = useState(true)

  const cat = useLocation().search
  
  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  }, [cat])
  

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post =>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="post" />
            </div>
            <div className="content">
              <div className="title">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                 
              </div>
              
              <p>{readMore?
              getText(post.desc) : `${getText(post.desc).substring(0,175)}...`

              }
              <br /> <p>&nbsp;</p>
              </p>

              <button onClick={()=>setReadMore(!readMore)}>
                {readMore? 'Show Less' : 'Read More'}
              </button>
               
               
            </div>
          </div>
        )

        )}
      </div>
    </div>
  )
}

export default Home