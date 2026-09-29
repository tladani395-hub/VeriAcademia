import { Controller, Post, Body, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('sign-up')
  async signUp(@Body() body: any) {
    const { name, email, password } = body;
    return {
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
      user: { id: 'usr-101', email, name, isEmailVerified: false, role: 'User' },
    };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: any) {
    const { email, password } = body;
    return {
      success: true,
      token: 'jwt-session-token-veriacademia-mock-2026',
      user: {
        id: 'usr-tirth-01',
        name: 'Dr. Tirth Ladani',
        email: email || 'tirth@charusat.ac.in',
        role: 'UniversityAdmin',
        universitySlug: 'charusat',
        isEmailVerified: true,
      },
    };
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return {
      success: true,
      message: 'Email address successfully verified. You may now sign in to your dashboard.',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: any) {
    return {
      success: true,
      message: 'Password reset link sent to your registered email address.',
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: any) {
    return {
      success: true,
      message: 'Password updated successfully. Please sign in with your new credentials.',
    };
  }

  @Post('mfa')
  async verifyMfa(@Body() body: any) {
    return {
      success: true,
      verified: true,
      token: 'mfa-authenticated-session-token-2026',
    };
  }
}
