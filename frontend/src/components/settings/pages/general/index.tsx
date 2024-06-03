import { DialogBody, DialogButton, DialogControlsSection, DialogControlsSectionHeader, Field, Toggle } from '@decky/ui';
import { showModal } from 'decky-frontend-lib';
import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

import { useDeckyState } from '../../../DeckyState';
import BranchSelect from './BranchSelect';
import NotificationSettings from './NotificationSettings';
import StoreSelect from './StoreSelect';
import UpdaterSettings from './Updater';

const UninstallModal = lazy(() => import('../../../../components/modals/UninstallModal'));
export default function GeneralSettings({
  isDeveloper,
  setIsDeveloper,
}: {
  isDeveloper: boolean;
  setIsDeveloper: (val: boolean) => void;
}) {
  const openPasswordInput = async () => {
    showModal(
      <UninstallModal
        title={t('SettingsGeneralIndex.other.uninstall.label')}
        subtitle={t('SettingsGeneralIndex.other.uninstall.pwd_input')}
      />,
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
            onChange={(toggleValue: boolean) => {
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
        <DialogControlsSectionHeader>{t('SettingsGeneralIndex.other.uninstall.label')}</DialogControlsSectionHeader>
        <DialogBody>
          <Field label={t('SettingsGeneralIndex.other.uninstall.description')} focusable={true} />
          <DialogControlsSection>
            <DialogButton onClick={openPasswordInput}>
              {t('SettingsGeneralIndex.other.uninstall.short_label')}
            </DialogButton>
          </DialogControlsSection>
        </DialogBody>
      </DialogControlsSection>
    </DialogBody>
  );
}
