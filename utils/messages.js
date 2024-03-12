module.exports = {
    success: {
        USER_REGISTRED: 'Registered successfully',
        USER_LOGIN: 'Login successfully',
        USER_LOGOUT: 'Logout successfully',
        FORGOT_PASSWORD: 'If provided email is correct, we will send you reset password instructions',
        UPDATE_PASSWORD: 'Password updated successfully',
        RESET_PASSWORD: 'Password has been reset successfully, you can now login with the new password',
        REFRESH_TOKEN: 'Token has been refreshed successfully, you are now logged in',
        GET_RESOURCE: 'Fetch resource successfully',
        GET_RESOURCES: 'Fetch resources successfully',
        CREATE_RESOURCE: 'Create resource successfully',
        UPDATE_RESOUCRE: 'Update resource successfully',
        DELETE_RESOURCE: 'Delete resource successfully',
        BORROW_BOOK_COMPLETED: 'Borrowing process has been completed successfully',
        RETURN_BOOK: 'Book has been returned successfully',
        BORROW_BOOK_AGAIN: 'You have borrowed the book again successfully'
    },
    error: {
        RESOURCE_NOT_FOUND: 'Resource not found!',
        DUPLICATE_RESOURCE: 'Duplicate record, resource already exists!',
        NOT_AUTHORIZED: 'Your are not authorized to access this route!',
        FORBIDDEN: 'You don\'t have permissions to access this route!',
        SERVER_ERROR: 'Internal server error',
        INCORRECT_OLD_PASSWORD: 'Old password is incorrect',
        REQUIRED_PASSWORD: 'Password is required',
        INVALID_CREDENTIALS: 'Invalid credentials',
        INVALID_TOKEN: 'Invalid token',
        INVALID_ACCESS_TOKEN: 'Access token is invalid!',
        INVALID_REFRESH_TOKEN: 'Refresh token is invalid!',
        INVALID_RESET_PASSWORD_TOKEN: 'Reset password token is invalid',
        REVOKED_TOKEN: 'Revoked token! Please login again!',
        EXPIRED_ACCESS_TOKEN: 'Access token is expired!',
        EXPIRED_REFRESH_TOKEN: 'Refresh token is expired!',
        INVALID_IMAGE: 'The file you provided is not a valid image',
        INVALID_FILE_NAME: 'Invalid characters in file name, please rename it, or upload another file',
        INVALID_FILE_SIZE: 'File size is too large. Max 1MB allowed',
        INVALID_EMAIL: 'Please provide a valid email address!',
        INVALID_ROLE: 'Please provide a valid role for the user',
        INVALID_NAME_LENGTH: 'Name must be between 5 and 100 characters',
        ALPHANUMERIC_NAME: 'Name should only contains letters and numbers',
        INVALID_BOOK: 'Book is not exist or not available right now',
        INVALID_USER: 'User is not found',
        REQUIRED_AUTHOR: 'Author is required',
        INVALID_AUTHOR: 'Author is invalid',
        REQUIRED_GENRE: 'Genre is required',
        INVALID_GENRE: 'Genre is invalid',
        REQUIRED_ISBN: 'ISBN is required',
        INVALID_ISBN: 'ISBN is invalid',
        INVALID_AVAILABLE_COPIES: 'Available copies is invalid',
        REQUIRED_SHELF_LOCATION: 'Shelf location is required',
        REQUIRED_NATIONALITY: 'Nationality is required',
        REQUIRED_BIOGRAPHY: 'Biography is required',
        REQUIRED_DESCRIPTION: 'Description is required',
        REQUIRED_EMAIL: 'Email is required',
        REQUIRED_NAME: 'Name is required',
        INVALID_BOOKS_TITLE_LENGTH: 'Title must be between 5 and 200 characters',
        BORROWED_BOOK_BY_USER: 'This book already borrowed by this user',
        EXCEED_BORROW_LIMIT: 'You have reached the maximum borrowing limit for books',
        AVAILABLE_BOOKS_GREATER_THAN_ZERO: 'Available book copies should be greater than zero!'
    }
}