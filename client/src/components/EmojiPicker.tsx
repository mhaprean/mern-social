import { FaceSmileIcon } from '@heroicons/react/24/solid';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover } from '@headlessui/react';

interface IPropsEmojiPicker {
  onPick: (val: string) => void;
}

const EmojiPicker = ({ onPick }: IPropsEmojiPicker) => {
  const addEmoji = (e: any) => {
    onPick(e.native);
  };

  return (
    <Popover className="relative">
      <Popover.Button
        className="h-8 w-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-all duration-200
   p-1.5 flex items-center justify-center ml-1"
      >
        <FaceSmileIcon className="w-7 h-7 text-orange-400" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 border bg-white rounded-xl right-0 bottom-[40px]">
        <Picker data={data} emojiSize={20} emojiButtonSize={28} onEmojiSelect={addEmoji} maxFrequentRows={0} />
      </Popover.Panel>
    </Popover>
  );
};

export default EmojiPicker;
