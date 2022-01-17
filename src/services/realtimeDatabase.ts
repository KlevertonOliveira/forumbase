import { useEffect, useState } from 'react';

import { database } from '../libs/firebaseConfig';
import { ref, onValue, remove, off, push, update, set } from 'firebase/database';

import { TPost } from '../types/TPost';
import { TAnswer } from '../types/TAnswer';

export async function addPost(post: TPost) {

  const postsListRef = ref(database, 'posts');
  const newPostRef = push(postsListRef);

  await set(newPostRef, {
    title: post.title,
    content: post.content,
    category: post.category,
    createdAt: post.createdAt,
    creatorId: post.creatorId,
    creatorEmail: post.creatorEmail,
    creatorPhotoURL: post.creatorPhotoURL,
    answers: null,
  })
}

export async function addAnswer(postKey: string, answer: TAnswer){
  const answersRef = ref(database, `posts/${postKey}/answers`);
  const newAnswerRef = push(answersRef);

  await set(newAnswerRef, {
    content: answer.content,
    createdAt: answer.createdAt,
    creatorId: answer.creatorId,
    creatorEmail: answer.creatorEmail,
    creatorPhotoURL: answer.creatorPhotoURL,
  })
}

export const usePosts = () => {

  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    const postsRef = ref(database, 'posts/');
    
    onValue(postsRef, (snapshot) => {
      const postsList = Object.entries<TPost>(snapshot.val() ?? {}).map(([key, value])=>{
        return{
          id: key,
          title: value.title,
          content: value.content,
          category: value.category,
          createdAt: value.createdAt,
          creatorId: value.creatorId,
          creatorEmail: value.creatorEmail,
          creatorPhotoURL: value.creatorPhotoURL,
        }
      });
      setPosts(postsList);
    })

    return () => {
      off(postsRef);
    }
      
  }, [])

  return {posts}
}

export async function updatePost(postKey: string, newPostData: {title:string, content:string}){
    
  const postNewData = {
      title: newPostData.title,
      content: newPostData.content,
  }

  await update(ref(database, `posts/${postKey}`), postNewData);
}

export async function updateAnswer(postKey: string, answerKey:string, newPostData: {content:string}){
    
  const answerNewData = {
      content: newPostData.content,
  }

  await update(ref(database, `posts/${postKey}/answers/${answerKey}`), answerNewData);
}

export function usePost(postKey:string){

  const [post, setPost] = useState({} as TPost);

  useEffect(()=>{
    const postRef = ref(database, `posts/${postKey}`);
    
    onValue(postRef, (snapshot) => {
        
      console.log(snapshot.val());
        
      setPost({
        title: snapshot.val().title,
        content: snapshot.val().content,
        category: snapshot.val().category,
        createdAt: snapshot.val().createdAt,
        creatorId: snapshot.val().creatorId,
        creatorEmail: snapshot.val().creatorEmail,
        creatorPhotoURL: snapshot.val().creatorPhotoURL,
        answers: Object.entries<TAnswer>(snapshot.val().answers ?? {}).map(([key, value])=>{
          return{
              id: key,
              content: value.content,
              createdAt: value.createdAt,
              creatorId: value.creatorId,
              creatorEmail: value.creatorEmail,
              creatorPhotoURL: value.creatorPhotoURL,
          }
        })
      }) 
    })

    return () => {
        off(postRef);
    }
}, [postKey])

  return {post}
}

export async function removePost(postKey: string){
  const postRef = ref(database, `posts/${postKey}`);
  
  try{
      off(postRef);
      await remove(postRef);
  }
  catch(error){
      console.log(error);
  }
}

export async function removeAnswer(postKey: string, answerKey: string){
    
  const answerRef = ref(database, `posts/${postKey}/answers/${answerKey}`);
  
  await remove(answerRef);
}