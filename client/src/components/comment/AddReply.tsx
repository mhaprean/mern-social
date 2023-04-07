import { useAddReplyMutation } from '../../redux/apiSlice';
import AddComment from './AddComment';

interface IPropsAddReply {
  commentId: string;
  setOpenReply?: (val: boolean) => void;
}

const AddReply = ({ commentId, setOpenReply = () => {} }: IPropsAddReply) => {
  return (
    <div className="w-full pl-[50px]">
      <AddComment postId="" commentId={commentId} isReply={true} setOpenReply={setOpenReply} />
    </div>
  );
};

export default AddReply;
