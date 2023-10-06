import React from 'react';
import gql from 'graphql-tag';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import {Form as FinalForm,Field} from 'react-final-form';
import client from '../connectivity/client';
import { GET_POSTS } from './View';
import { render } from '@testing-library/react';

const UPDATE_POST = gql`
mutation Mutation($updatePostData: UpdatePostInput!, $updatePostId: Float!) {
    updatePost(data: $updatePostData, id: $updatePostId) {      
      id
    }
  }
`;

const CREATE_POST = gql`
mutation Mutation($createPostData: CreatePostInput!) {
  createPost(data: $createPostData) {
    id
  }
}
`;


const PostEditor = ({post,onClose})=>(
    <FinalForm 
    onSubmit={async({id,title,content })=>{
        const postData = {title,content };
        const postId = parseFloat(id);
        console.log('postId',postId);
        if(postId>0){
        await client.mutate({
            variables:{updatePostData:postData,updatePostId:postId},
            mutation:UPDATE_POST,
            refetchQueries:()=>[{query:GET_POSTS}]
        	});
    	}
    	else{
    	await client.mutate({
            variables:{createPostData:postData},
            mutation:CREATE_POST,
            refetchQueries:()=>[{query:GET_POSTS}]
        	});	
    	}

        onClose();
    }}
    initialValues={post}
    render={({handleSubmit,prestine,invalid}:any)=>(
        <Modal isOpen toggle={onClose}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader>                	
                    {'Edit Post'}                    
                </ModalHeader>
                <ModalBody>
                
                    <FormGroup>
                    <div className="row">
                		
                    	<div className="col-2 col-lg-2">
                        <Label className="mb-0">Title</Label>
                        </div>
                        <div className="col-8 col-lg-8">
                        <Field required name="title" component="input" />
                        </div>
                        
                  		</div>
                    </FormGroup>
                    <FormGroup>
                    <div className="row">                	
                    <div className="col-2 col-lg-2">
                        <Label className="mb-0">Content</Label>
                        </div>
                        <div className="col-8 col-lg-8">
                        <Field name="content" component="input" />
                        </div>                        
                  </div>
                    </FormGroup>
                    
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" disabled={prestine} color="primary">Save</Button>
                    <Button color="secondary" onClick={onClose}>Cancel</Button>
                </ModalFooter>

            </Form>
        </Modal>
    )}
    >

    </FinalForm>
);

export default PostEditor;