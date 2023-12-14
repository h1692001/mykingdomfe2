import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledPostCart = styled('div')`

.container{
    transition:all .3s ease-in;
    display:inline-block;
    width:530px !important;
    padding:0 10px 10px 10px;
    border-radius:10px;
}
.container:hover{
    box-shadow: 1px 7px 17px 0px rgba(0,0,0,0.75);
}
`
const PostCard = ({ post }) => {

    return <StyledPostCart>
        <Link to={"/postDetail/" + post?.id} className="container">
            <img src={post?.thumb} alt="thumb" style={{ height: '260px', objectFit: 'cover', width: '100%' }}></img>
            <p style={{ fontSize: '18px', textOverflow: 'ellipsis', color: '#333', margin: '15px 0 10px', fontWeight: '600', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden', display: '-webkit-box' }} className="truncate text-ellipsis">{post?.title}</p>
            <p>{post?.des}</p>
        </Link>
    </StyledPostCart>
}
export default PostCard;