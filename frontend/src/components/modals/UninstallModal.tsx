import { ConfirmModal } from 'decky-frontend-lib';
import { TextField } from 'decky-frontend-lib';
import React, { FC, useState } from 'react';
interface UninstallModalProps {
  title: string;
  subtitle: string;
  closeModal?(): void;
}

const UninstallModal: FC<UninstallModalProps> = ({ title, subtitle, closeModal }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <ConfirmModal
      closeModal={closeModal}
      onOK={async () => {
        console.log(inputValue);
      }}
      strTitle={title}
    >
      <TextField label={subtitle} onChange={handleChange} value={inputValue} />
    </ConfirmModal>
  );
};

export default UninstallModal;
