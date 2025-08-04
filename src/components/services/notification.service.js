// services/notificationService.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllNotifications = async (token, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/notifications/all/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      let errorDetails = "";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorJson = await response.json();
          errorDetails = `, Message: ${
            errorJson.message || JSON.stringify(errorJson)
          }`;
        } else {
          errorDetails = `, Response: ${await response.text()}`;
        }
      } catch (parseError) {
        errorDetails = `, No readable error details from server.`;
      }
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      return [];
    }
    const data = JSON.parse(responseText);
    return data.payload || data || [];
  } catch (error) {
    console.error("Error in fetchAllNotifications:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (token, userId, notificationId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/notifications/read/${userId}/${notificationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      let errorDetails = "";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorJson = await response.json();
          errorDetails = `, Message: ${
            errorJson.message || JSON.stringify(errorJson)
          }`;
        } else {
          errorDetails = `, Response: ${await response.text()}`;
        }
      } catch (parseError) {
        errorDetails = `, No readable error details from server.`;
      }
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    const responseText = await response.text();

    if (responseText) {
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return JSON.parse(responseText);
        } else {
          console.warn(
            `markNotificationAsRead received non-JSON success response: ${responseText}`
          );
          return { success: true, message: responseText };
        }
      } catch (parseError) {
        console.error(
          "Failed to parse markNotificationAsRead response as JSON:",
          parseError,
          "Response text:",
          responseText
        );
        return {
          success: true,
          message: "Operation successful, but response not JSON.",
        };
      }
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Error in markNotificationAsRead:", error);
    throw error;
  }
};

// ✨ NEW FUNCTION ADDED ✨
/**
 * Marks all notifications for a user as read.
 * @param {string} token - The user's JWT authentication token.
 * @param {string|number} userId - The ID of the user.
 * @returns {Promise<object>} A promise that resolves to the server's response.
 */
export const markAllNotificationsAsRead = async (token, userId) => {
  try {
    // Note: The endpoint '/notifications/read-all/${userId}' is an assumption.
    // Please verify this is the correct endpoint for your backend API.
    const response = await fetch(
      `${API_BASE_URL}/notifications/read-all/${userId}`,
      {
        method: "PUT", // Using PUT, consistent with marking one as read
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      let errorDetails = "";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorJson = await response.json();
          errorDetails = `, Message: ${
            errorJson.message || JSON.stringify(errorJson)
          }`;
        } else {
          errorDetails = `, Response: ${await response.text()}`;
        }
      } catch (parseError) {
        errorDetails = `, No readable error details from server.`;
      }
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    // Gracefully handle responses with or without a body
    const responseText = await response.text();
    if (!responseText) {
      return { success: true, message: "All notifications marked as read." };
    }
    
    // If there is a response, try to parse it as JSON
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Error in markAllNotificationsAsRead:", error);
    throw error;
  }
};


export const parseJwt = (token) => {
  try {
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Error parsing JWT:", e);
    return null;
  }
};

export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const notificationDate = new Date(timestamp);
  const diffInMs = now - notificationDate;
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMins < 1) return "Just Now";
  if (diffInMins < 60) return `${diffInMins} mins ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return notificationDate.toLocaleDateString();
};