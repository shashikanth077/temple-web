import React from 'react';
import { adminProtectedRoutes } from './admin/adminRoutes';
import { publicProtectedFlattenRoutes } from './public/publicRoutes';
import { memberFlatterRoutes } from './member/memberRoutes';
import { AuthProtectedFlattenRoutes, AuthpublicFlattenRoutes } from './auth/authRoutes';

export {
    adminProtectedRoutes,
    publicProtectedFlattenRoutes,
    memberFlatterRoutes,
    AuthProtectedFlattenRoutes,
    AuthpublicFlattenRoutes,
};
