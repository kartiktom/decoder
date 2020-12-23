import react, { useEffect, useState, useContext } from 'react';
import {Link}  from 'react-router-dom';
import {UserContext} from '../../App';      // learn this navigation

function CategoryA()
{
    const [allThePosts,setAllThePosts]=useState([]);
    const categoryName="B";
    const {state,dispatch}=useContext(UserContext)

    useEffect(()=>{
        fetch(`/allposts/${categoryName}`,{
            method:"get",
            headers:{
                "Authorization" : "Bearer " + localStorage.getItem("jwt") 
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setAllThePosts(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    function LikePost(postId)
    {
        fetch('/likepost',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt") 
            },
            body:JSON.stringify({
                postId,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            const newData=allThePosts.map(item=>{
                if(item._id === data._id)
                    return data;
                else   
                    return item;
            })

            setAllThePosts(newData);
            // flag+=1;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function UnlikePost(postId)
    {
        fetch('/unlikepost',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            // flag+=1;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function DeletePost(postId)
    {
        fetch(`/delete/${postId}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            const newData=allThePosts.map(item=>{
                    if(item._id !== data._id)
                        return item
                    return data
            })
            setAllThePosts(newData);
            // flag+=1;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function makeComment(comment,postId)
    {
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                commentBody:comment,
                postId,
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data);
            const newData=allThePosts.map(item=>{
                if(item._id === data._id)
                    return data
                else    
                    return item
            })
            setAllThePosts(newData)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function ForkPost(postId)
    {
        fetch('/forkpost',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }

    function UnForkPost(postId)
    {
        fetch('/unforkpost',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    postId,
                })
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data.forkedPost)
                dispatch({type:"FORK" , payload : data.forkedPost})
                localStorage.setItem("user",JSON.stringify(data))
            })
    }

    return (
        <div>
            {
                allThePosts.map(item=>{
                    return(
                        // console.log(item),

                        // body: "d"
                        // category: "C"
                        // comments: []
                        // likes: []
                        // pic: "C:\fakepath\wallhaven-42qee6_1366x768.png"
                        // postedby: {_id: "5fc9dbfa24626d26b8296d32", name: "y"}
                        // title: "d"
                        // __v: 0
                        // _id: "5fc9e12024626d26b8296d33"
                        // __proto__: Object

                        <div className="card">
                            <Link to={"/viewpost/" + item._id }><h2>{item.title}</h2></Link>
                            {/* <h2>{item._id}</h2> */}
                            <h2>{item.body}</h2>
                            <h4>{item.likes.length} likes</h4>

                            <div>
                            {
                                item.likes.includes(state._id)
                                ?
                                    <button 
                                    className="btn"
                                    onClick={()=>{
                                        UnlikePost(item._id)
                                    }}
                                    >Unlike</button>
                                :
                                    <button 
                                    className="btn"
                                    onClick={()=>{
                                        LikePost(item._id)
                                    }}
                                    >Like</button>

                            }

                            {
                                item.postedby._id === state._id
                                &&
                                <button 
                                className="btn"
                                onClick={()=>{
                                DeletePost(item._id)
                                }}
                                >Delete</button>
                            }
 
                            {
                                
                                state
                                ?
                                    // 
                                    state.forkedPost.some(({_id})=>_id === item._id)
                                    ?
                                    <button 
                                    className="btn"
                                    onClick={()=>{
                                        // console.log("yes");
                                        UnForkPost(item._id)
                                    }}
                                    >UnFork</button>
                                    :
                                    <button 
                                    className="btn"
                                    onClick={()=>{
                                        ForkPost(item._id)
                                    }}
                                    >Fork</button>

                                :

                                <h5> loading </h5>

                            }

                            {/* {
                                state.forkedPost.includes(item._id)
                                ?
                                <button 
                                className="btn"
                                onClick={()=>{
                                    UnForkPost(item._id)
                                }}
                                >UnFork</button>
                                :
                                <button 
                                className="btn"
                                onClick={()=>{
                                    ForkPost(item._id)
                                }}
                                >Fork</button>
                            }  */}

                            {/* <button 
                            className="btn"
                            onClick={()=>{
                                ForkPost(item._id)
                            }}
                            >Fork</button>
                            
                            <button 
                            className="btn"
                            onClick={()=>{
                                UnForkPost(item._id)
                            }}
                            >Un Fork</button> */}



                            </div>
                            {/* <h4>Previous Comments</h4> */}
                            <div>
                                {
                                    item.comments.map(userComment=>{
                                        // console.log(userComment)
                                        return(
                                            <h6>
                                                <span style={{fontWeight:"600"}}>{userComment.commentedBy.name}</span> {userComment.commentBody}
                                            </h6>   
                                        )
                                    })
                                }
                            </div>

                            <div>
                                <form onSubmit={(e)=>{
                                    makeComment(e.target[0].value , item._id);
                                    e.preventDefault();     //when we submit forms, the page automatically gets reloaded
                                }}>                         
                                    <input                  //to prevent that reloading, we have used e.preventDefault()
                                    type="text"
                                    placeholder="comments"
                                    />
                                </form>
                            </div>

                        </div>
                    )
                })
            }
            {/* <h1>this is Home</h1> */}
        </div>
    );
}

export default CategoryA;