import {RemindersStackNavProps} from '../../RemindersParamList';

export type RemindersTabsParamList = {
  FriendMessages: {
    stackNavigator: RemindersStackNavProps<'Reminders'>;
  };
  Requests: undefined;
};
