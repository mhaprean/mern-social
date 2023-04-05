import { IComment } from '../../redux/apiSlice';

interface IPropsComment {
  comment: IComment;
}

const Comment = ({ comment }: IPropsComment) => {
  return (
    <div className="flex space-x-2">
      <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="Profile" className="rounded-full w-10 h-10" />
      <div>
        <div className="flex space-x-1 flex-col">
          <span className="font-bold">{comment.user.name}</span>
          <span className="text-gray-400 font-bold text-xs">{comment.createdAt}</span>
        </div>
        <p className="text-gray-600">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
