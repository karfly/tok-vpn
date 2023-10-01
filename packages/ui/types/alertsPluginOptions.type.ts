type Component = any;

export type AlertsPluginStatusColors = {
  background: string;
  color: string;
  close: string;
  iconColor: string;
};

export type AlertsPluginOptions = {
  position: 'top' | 'top-right' | 'bottom' | 'bottom-right';
  transitionName: 'tok-list-transition' | 'tok-list-right-transition' | string;
  iconsByType: Record<string, string | Component>;
  colorsByType: Record<string, AlertsPluginStatusColors>;
};
