import { DialogBody, DialogControlsSection, DialogControlsSectionHeader, Field, Toggle } from '@decky/ui';
import { useTranslation } from 'react-i18next';

import { useDeckyState } from '../../../DeckyState';
import BranchSelect from './BranchSelect';
import NotificationSettings from './NotificationSettings';
import StoreSelect from './StoreSelect';
import UpdaterSettings from './Updater';

export default function GeneralSettings({
  isDeveloper,
  setIsDeveloper,
}: {
  isDeveloper: boolean;
  setIsDeveloper: (val: boolean) => void;
}) {
  const openPasswordInput = async () => {
    await window.DeckyPluginLoader.openTextInput(
      t('SettingsGeneralIndex.other.uninstall.pwd_input'),
      t('SettingsGeneralIndex.other.uninstall.pwd_confirm'),
      t('SettingsGeneralIndex.other.uninstall.pwd_cancel'),
      (pwd: string) => {
        console.log(pwd);
      },
    );
  };
  const { versionInfo } = useDeckyState();
  const { t } = useTranslation();

  return (
    <DialogBody>
      <DialogControlsSection>
        <DialogControlsSectionHeader>{t('SettingsGeneralIndex.updates.header')}</DialogControlsSectionHeader>
        <UpdaterSettings />
      </DialogControlsSection>
      <DialogControlsSection>
        <DialogControlsSectionHeader>{t('SettingsGeneralIndex.beta.header')}</DialogControlsSectionHeader>
        <BranchSelect />
        <StoreSelect />
      </DialogControlsSection>
      <DialogControlsSection>
        <DialogControlsSectionHeader>{t('SettingsGeneralIndex.notifications.header')}</DialogControlsSectionHeader>
        <NotificationSettings />
      </DialogControlsSection>
      <DialogControlsSection>
        <DialogControlsSectionHeader>{t('SettingsGeneralIndex.other.header')}</DialogControlsSectionHeader>
        <Field label={t('SettingsGeneralIndex.developer_mode.label')}>
          <Toggle
            value={isDeveloper}
            onChange={(toggleValue) => {
              setIsDeveloper(toggleValue);
            }}
          />
        </Field>
      </DialogControlsSection>
      <DialogControlsSection>
        <DialogControlsSectionHeader>{t('SettingsGeneralIndex.about.header')}</DialogControlsSectionHeader>
        <Field label={t('SettingsGeneralIndex.about.decky_version')} focusable={true}>
          <div style={{ color: 'var(--gpSystemLighterGrey)' }}>{versionInfo?.current}</div>
        </Field>
      </DialogControlsSection>
      <DialogControlsSection>
        <Field label={t('SettingsGeneralIndex.other.uninstall.label')}>
          <div style={{ color: 'var(--gpSystemLighterGrey)' }}>
            {t('SettingsGeneralIndex.other.uninstall.description')}
          </div>
          <DialogButton onClick={openPasswordInput}>
            {t('SettingsGeneralIndex.other.uninstall.pwd_confirm')}
          </DialogButton>
        </Field>
      </DialogControlsSection>
    </DialogBody>
  );
}
