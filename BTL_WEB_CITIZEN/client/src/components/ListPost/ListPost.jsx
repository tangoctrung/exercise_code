import React from 'react';
import "./ListPost.css";
import Post from './Post/Post';

function ListPost({dataPost}) {
    return (
        
        <div className="listPost">
            {dataPost?.map((post, index) => (
                <Post post={post} key={index}/>
            ))}
        </div>
    )
}

export default ListPost;
