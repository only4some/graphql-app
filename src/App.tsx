import React,{useState,Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button,Container} from 'reactstrap';
import View from './posts/View';
import Editor from './posts/Editor';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

import {useSuspenseQuery,TypedDocumentNode} from '@apollo/client';
import Main from './three/main-component';

const loaderHTML=<div className="loader"><div className="loader-wheel"></div><div className="loader-text"></div></div>;

const initState={
	editing:{},
	show:false
}
function App() {
  
  loadDevMessages();
  //loadErrorMessages();


  const [editState,setEditState] = useState(initState);
  return (
    <Container fluid>
    
      <Button className="my-2"
      color="primary"
      onClick={()=>setEditState({editing:{},show:true})}  >
        New Post
      </Button>
	<Suspense fallback={loaderHTML}>
      <View canEdit={()=>true}
      onEdit={(post)=>setEditState({editing:post,show:true})} />
      </Suspense> 

      {editState.show &&(
      	<Suspense fallback={loaderHTML}>
        <Editor post={editState?.editing} onClose={()=>setEditState({editing:{},show:false})}/>
        </Suspense> 
      )}
   

    {/* <Main /> */}

    </Container>
   
  );
}

export default App;
