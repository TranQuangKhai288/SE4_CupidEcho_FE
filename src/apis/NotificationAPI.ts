import baseURL from "./Customize-axios";

export type Notification = {
  _id: string;
  userId: string;
  type: "like" | "comment" | "relationship_request" | "relationship_accepted";
  content: string;
  link?: string;
  isRead: boolean;
  relatedUserId?: string;
  objectId?: string;
  objectType?: "post" | "comment" | "relationship";
  createdAt: string;
  updatedAt: string;
};

export type NotificationResponse = {
  notifications: Notification[];
  total: number;
  page: number;
  totalPages: number;
};

export const getNotifications = async (
  page: number = 1,
  limit: number = 10
): Promise<NotificationResponse | null> => {
  try {
    const res = await baseURL.get(`/notifications?page=${page}&limit=${limit}`);
    console.log(res, "res");
    return res.data;
  } catch (error) {
    console.error("Get notifications error:", error);
    return null;
  }
};

/**
 * Đánh dấu 1 thông báo là đã đọc
 */
export const markNotificationAsRead = async (
  notificationId: string
): Promise<boolean> => {
  try {
    await baseURL.patch(`/notifications/${notificationId}/read`);
    return true;
  } catch (error) {
    console.error("Mark notification as read error:", error);
    return false;
  }
};

/**
 * Đánh dấu tất cả thông báo là đã đọc
 */
export const markAllNotificationsAsRead = async (): Promise<boolean> => {
  try {
    await baseURL.patch(`/notifications/read-all`, {});
    return true;
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    return false;
  }
};
