interface IPropsInput {
  type: 'text' | 'password' | 'email';
  label?: string;
  name?: string;
  value: string;
  required?: boolean;
  onChange: (val: string) => void;
}

const Input = ({ type, value, onChange, name = '', label = '', required = true }: IPropsInput) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm text-gray-800 font-semibold mb-2 ">{label}</label>}

      <input
        type={type}
        name={name || label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border text-base rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-sky-800"
        required={required}
      />
    </div>
  );
};

export default Input;
