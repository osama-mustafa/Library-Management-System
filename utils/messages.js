module.exports = {
    success: {
        USER_REGISTRED: 'Registered successfully',
        USER_LOGIN: 'Login successfully',
        USER_LOGOUT: 'Logout successfully',
        FORGOT_PASSWORD: 'If provided email is correct, we will send you reset password instructions',
        UPDATE_PASSWORD: 'Password updated successfully',
        RESET_PASSWORD: 'Password has been reset successfully, you can now login with the new password',
        GET_RESOURCE: 'Fetch resource successfully',
        GET_RESOURCES: 'Fetch resources successfully',
        CREATE_RESOURCE: 'Create resource successfully',
        UPDATE_RESOUCRE: 'Update resource successfully',
        DELETE_RESOURCE: 'Delete resource successfully',
        BORROW_BOOK_COMPLETED: 'Borrowing process has been completed successfully',
        RETURN_BOOK: 'Book has been returned successfully'
    },
    error: {
        RESOURCE_NOT_FOUND: 'Resource not found!',
        DUPLICATE_RESOURCE: 'Duplicate record, resource already exists!',
        NOT_AUTHORIZED: 'Your are not authorized to access this route!',
        FORBIDDEN: 'You don\'t have permissions to access this route!',
        SERVER_ERROR: 'Internal server error',
        INCORRECT_OLD_PASSWORD: 'Old password is incorrect',
        INVALID_CREDENTIALS: 'Invalid credentials',
        INVALID_TOKEN: 'Invalid token',
        REVOKED_TOKEN: 'Revoked token! Please login again or create a new account',
        INVALID_IMAGE: 'The file you provided is not a valid image',
        INVALID_FILE_NAME: 'Invalid characters in file name, please rename it, or upload another file',
        INVALID_FILE_SIZE: 'File size is too large. Max 1MB allowed',
        INVALID_EMAIL: 'Please provide a valid email address!',
        INVALID_ROLE: 'Please provide a valid role for the user',
        INVALID_NAME_LENGTH: 'Name must be between 1 and 100 characters',
        INVALID_BOOK: 'Book is not exist or not available right now',
        INVALID_USER: 'User is not found',
        BORROWED_BOOK_BY_USER: 'This book already borrowed by this user',
        AVAILABLE_BOOKS_GREATER_THAN_ZERO: 'Available books should be greater than zero!'
    }
}