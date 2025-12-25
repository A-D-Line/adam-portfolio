# Security Audit Report
**Adam Line Portfolio - Technical Compliance Audit**  
**Date:** December 25, 2025  
**Auditor:** Senior Web Security Engineer

---

## Executive Summary

This security audit examined the Adam Line portfolio codebase for potential security vulnerabilities, with a focus on environment variable exposure, XSS risks, Content Security Policy implementation, and general security best practices.

**Overall Risk Level:** 🟢 **LOW**

The application demonstrates good baseline security hygiene with no critical vulnerabilities identified. However, several recommendations are provided to strengthen the security posture for production deployment.

---

## Findings

### ✅ Passed Checks

#### 1. Environment Variables
- **Status:** ✅ SAFE
- **Finding:** No `.env` files or environment variables detected in the codebase
- **Note:** Application uses Vite (not Next.js). If environment variables are needed in the future, use `VITE_` prefix for client-side variables (similar to Next.js's `NEXT_PUBLIC_` pattern)

#### 2. XSS Protection
- **Status:** ✅ SAFE
- **Finding:** No usage of `dangerouslySetInnerHTML` detected across all components
- **Impact:** Application is protected against basic XSS injection via React's default escaping

#### 3. External Links
- **Status:** ✅ SAFE
- **Finding:** External link to Stage One website properly uses `rel="noopener noreferrer"`
- **Location:** [Company.tsx:L18](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Company.tsx#L18)
- **Impact:** Prevents reverse tabnabbing attacks

---

## ⚠️ Recommended Improvements

### Priority 1: Critical (Pre-Deployment)

#### 1. Content Security Policy (CSP)
**Risk Level:** MEDIUM  
**Effort:** LOW

**Issue:** No Content Security Policy headers configured

**Recommendation:** Add CSP meta tags to [index.html](file:///Users/davidcoutts/Documents/Github/adam-portfolio/index.html) or configure CSP headers at the server/hosting level.

**Implementation Options:**

**Option A: Meta Tag (Quick Fix)**
Add to `<head>` section in `index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' mailto:;
">
```

> [!NOTE]
> `'unsafe-inline'` is required for Vite's development mode. For production, consider using strict-CSP with nonces.

**Option B: Server-Level Headers (Production Best Practice)**
If deploying to Netlify, Vercel, or similar platforms, configure via `_headers` or platform settings:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:;
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

#### 2. Security Headers
**Risk Level:** MEDIUM  
**Effort:** LOW

**Issue:** Missing essential security headers

**Recommendation:** Add the following meta tags to [index.html](file:///Users/davidcoutts/Documents/Github/adam-portfolio/index.html):

```html
<!-- Prevent clickjacking -->
<meta http-equiv="X-Frame-Options" content="DENY">

<!-- Prevent MIME type sniffing -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- Referrer policy -->
<meta name="referrer" content="strict-origin-when-cross-origin">
```

**Impact:** Provides defense-in-depth against clickjacking, MIME confusion attacks, and excessive referrer leakage.

---

### Priority 2: Moderate (Best Practices)

#### 3. Contact Form Security
**Risk Level:** LOW  
**Effort:** MEDIUM

**Current State:** Contact form uses `mailto:` action at [Contact.tsx:L14](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Contact.tsx#L14)

**Issues:**
- Limited functionality (opens native email client)
- Exposes email address to scrapers
- No CSRF protection
- No spam prevention
- Poor UX on mobile devices

**Recommendations:**

1. **Implement Server-Side Form Handling** (Recommended)
   - Use a form handling service (FormSpree, Netlify Forms, or Web3Forms)
   - Protects email address from scraping
   - Provides spam filtering
   - Better user experience

**Example: Netlify Forms**
```tsx
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  className="space-y-6 bg-white p-8 rounded-lg shadow-sm"
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Hidden honeypot field for spam prevention */}
  <p className="hidden">
    <label>
      Don't fill this out: <input name="bot-field" />
    </label>
  </p>
  {/* ... rest of form fields ... */}
</form>
```

2. **Alternative: Email Obfuscation**
   If keeping `mailto:`, obfuscate the email:
   ```tsx
   const email = atob('YWRhbUBhZGFtbGluZS5jby51aw=='); // Base64 encoded
   ```

---

#### 4. Subresource Integrity (SRI)
**Risk Level:** LOW  
**Effort:** LOW

**Issue:** External Google Fonts loaded without SRI hashes at [index.css:L1](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/index.css#L1)

**Recommendation:** Consider self-hosting fonts or adding SRI attributes:

```html
<link 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
  rel="stylesheet"
  crossorigin="anonymous"
  integrity="sha384-..." 
/>
```

**Note:** Google Fonts doesn't officially support SRI due to dynamic CSS generation. Self-hosting is the most secure option (see PERFORMANCE_CHECKLIST.md for implementation).

---

### Priority 3: Future Considerations

#### 5. HTTPS Enforcement
- Ensure deployment platform enforces HTTPS
- Configure HSTS headers if deploying with custom domain

#### 6. Dependency Security
**Current Status:** ✅ Using React 19.2.0 (latest stable)

**Recommendation:** Implement automated dependency scanning:
```bash
# Add to package.json scripts
"audit": "npm audit --audit-level=moderate"
```

Run regularly:
```bash
npm audit
npm audit fix
```

#### 7. Rate Limiting
- Consider implementing rate limiting if switching to server-side form handling
- Protects against DoS and spam attacks

---

## Compliance Checklist

| Check | Status | Priority |
|-------|--------|----------|
| Environment variable exposure | ✅ Pass | High |
| XSS via dangerouslySetInnerHTML | ✅ Pass | Critical |
| External link security | ✅ Pass | Medium |
| Content Security Policy | ⚠️ Missing | High |
| Security headers | ⚠️ Missing | High |
| Form security | ⚠️ Weak | Medium |
| HTTPS enforcement | ⚠️ TBD | High |
| Dependency vulnerabilities | ✅ Pass | Medium |
| Subresource Integrity | ⚠️ Missing | Low |

---

## Action Plan

### Before Production Deployment

1. **Implement Content Security Policy** (30 minutes)
   - Add CSP meta tag or configure server headers
   - Test with browser console for violations

2. **Add Security Headers** (15 minutes)
   - Add X-Frame-Options, X-Content-Type-Options, Referrer-Policy

3. **Upgrade Contact Form** (1-2 hours)
   - Integrate Netlify Forms or alternative
   - Add honeypot spam protection
   - Update CSP to allow form submission endpoint

4. **Verify HTTPS** (5 minutes)
   - Ensure deployment platform uses HTTPS
   - Configure HSTS headers if using custom domain

### Post-Deployment

1. **Security Monitoring**
   - Set up `npm audit` in CI/CD pipeline
   - Monitor for dependency vulnerabilities monthly

2. **Testing**
   - Test CSP configuration across browsers
   - Verify form submission works with security headers
   - Check external link behavior

---

## Resources

- [OWASP Top 10 Web Security Risks](https://owasp.org/www-project-top-ten/)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Vite Security Guide](https://vitejs.dev/guide/env-and-mode.html#env-files)
- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)

---

## Conclusion

The Adam Line portfolio demonstrates **good baseline security** with no critical vulnerabilities. The primary recommendations focus on implementing defense-in-depth measures through Content Security Policy and security headers before production deployment.

**Estimated Time to Remediate High-Priority Issues:** 1-2 hours

**Next Steps:**
1. Review and implement Priority 1 recommendations
2. Test security headers in staging environment
3. Consider form handling upgrade for improved UX and security
4. Proceed with performance optimization (see PERFORMANCE_CHECKLIST.md)
