import classNames from 'classnames';

interface IPropsAvatar {
  image?: string;
  size?: 'small' | 'medium' | 'large';
}

const Avatar = ({ image = '', size = 'medium' }: IPropsAvatar) => {
  const defaultImage = 'https://img.freepik.com/free-icon/user_318-159711.jpg';
  return (
    <img
      src={image || defaultImage}
      alt=""
      className={classNames('rounded-full flex-shrink-0', {
        'h-10 w-10': size === 'medium',
        'h-6 w-6': size === 'small',
        'h-14 w-14': size === 'large',
      })}
    />
  );
};

export default Avatar;
