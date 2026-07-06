

interface CheckBoxProps {
  checked: boolean;
  type:string;
  onChange?: () => void;
    disabled?: boolean; 
  name?:string
  value?:string
}

const CheckBox = ({ checked, onChange,disabled ,type,name,value}: CheckBoxProps) => {
  return (
    <input
      type={type}
      className="ui-checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      name={name}
      value={value}
    />
  );
};

export default CheckBox;
