import { IComment } from '../../redux/apiSlice';

interface IPropsComment {
  comment: IComment;
}

const Comment = ({ comment }: IPropsComment) => {
  return (
    <div className="flex space-x-2">
      <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="Profile" className="rounded-full w-10 h-10" />
      <div className="flex flex-col">
        <div className="rounded-2xl py-1 px-2 bg-slate-100 min-w-[120px]">
          <div className="flex flex-col">
            <span className="font-bold text-sm">{comment.user.name}</span>
            {/* <span className="text-gray-400 font-bold text-xs">{comment.createdAt}</span> */}
          </div>
          <p className="text-gray-600 text-base">{comment.content}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button className="text-gray-500 hover:text-gray-700 hover:underline">Like</button>
          <button className="text-gray-500 hover:text-gray-700 hover:underline">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
