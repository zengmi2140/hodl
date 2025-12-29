import React from 'react';
import { useTranslation } from 'react-i18next';
import SignerSlot from './SignerSlot';
import { CustodyData } from '../../types';

interface SignerColumnProps {
  signerSlots: (string | null)[];
  custodyData: CustodyData;
  compatibleSigners: string[];
  onSignerSelect: (slotIndex: number, signerId: string | null) => void;
}

const SignerColumn: React.FC<SignerColumnProps> = ({
  signerSlots,
  custodyData,
  compatibleSigners,
  onSignerSelect,
}) => {
  const { t } = useTranslation();
  // 获取已选择的签名器ID列表（用于过滤下拉选项）
  const selectedSignerIds = signerSlots.filter(s => s !== null) as string[];

  return (
    <div className="column">
      <div className="column-title">{t('columns.signer')}</div>
      {signerSlots.map((signerId, index) => (
        <SignerSlot
          key={index}
          slotIndex={index}
          selectedSignerId={signerId}
          custodyData={custodyData}
          compatibleSigners={compatibleSigners}
          selectedSignerIds={selectedSignerIds}
          onSelect={(id) => onSignerSelect(index, id)}
        />
      ))}
    </div>
  );
};

export default SignerColumn;