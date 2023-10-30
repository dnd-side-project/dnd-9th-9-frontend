export interface INotification {
  content: string;
  createdAt: string;
  id: number;
  isRead: boolean;
  fieldId?: number;
}

export interface IFieldNotification extends Omit<INotification, 'fieldId'> {}

export interface IHomeNotification extends INotification {
  fieldId: number;
}

export interface INotificationResponse<T extends INotification> {
  currentPageNumber: number;
  currentPageSize: number;
  totalCount: number;
  notificationInfos: T[];
}
