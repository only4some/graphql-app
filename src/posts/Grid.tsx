import React,{Suspense} from 'react';
import gql from 'graphql-tag';
import { Query} from 'react-apollo';
import  {Table}  from 'reactstrap';
import {useSuspenseQuery,TypedDocumentNode} from '@apollo/client';


const rowStyle = (post,canEdit) => canEdit(post)?{cursor:'pointer',fontWeight:'bold'}:{};

interface Data {
  posts: [{
    id: number;
    title: string;
    content: string;
  }];
}


export const GET_POSTS:TypedDocumentNode<Data> = gql `
query Query {
    posts {
        id,
        title,
        content
    }
  }
`;

const Grid= ({canEdit,onEdit})=>{

	const { data } =  useSuspenseQuery(GET_POSTS);
     return ( <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>                 
                    {data?.posts.map((post:any)=>(
                        <tr key={post.id}
                        style={rowStyle(post,canEdit)}
                        onClick={()=>canEdit(post)&&onEdit(post)}>
                        <td>{post.title}</td>
                        <td>{post.content}</td>

                        </tr>
                    ))}
                    
                </tbody>
            </Table>)};


Grid.defaultProps={
    canEdit:() =>false,
    onEdit: ()=>null

}
export default Grid;