import React,{Suspense} from 'react';
import gql from 'graphql-tag';
import { Query} from 'react-apollo';
import  {Table}  from 'reactstrap';
import {useSuspenseQuery,TypedDocumentNode, useSubscription} from '@apollo/client';
import Grid from './Grid';



interface Data {
  post: {
    id: number;
    title: string;
    content: string;
  };
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

const COMMENTS_SUBSCRIPTION=gql`
subscription Subscription {
  normalSubscription {
    id,
    message
  }
}
`;

const loaderHTML=<div className="loader"><div className="loader-wheel"></div><div className="loader-text"></div></div>;

const rowStyle = (post,canEdit) => canEdit(post)?{cursor:'pointer',fontWeight:'bold'}:{};

const View = ({canEdit,onEdit})=> { 
  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION);
 return ( <div>
        <h4>New comment: {!loading && data?.normalSubscription?.message}</h4>
        <Grid canEdit={canEdit} onEdit={onEdit} />
        </div>     
    
    );
    
    
}


View.defaultProps={
    canEdit:() =>false,
    onEdit: ()=>null
}
export default View;