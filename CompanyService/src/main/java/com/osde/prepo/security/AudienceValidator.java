package com.osde.prepo.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.Assert;

import java.util.List;

/***
 * Custom Validator to verify custom OAuth 2.0 Token attributes
 * from the jwt-token
 */
public class AudienceValidator implements OAuth2TokenValidator<Jwt> {
    Logger logger = LoggerFactory.getLogger(AudienceValidator.class);

    private final String audience;

    public AudienceValidator(String audience) {
        Assert.hasText(audience, "audience is null or empty");
        this.audience = audience;
    }

    @Override
    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        List<String> audiences = jwt.getAudience();

        if (audiences.contains(this.audience)) {
            return OAuth2TokenValidatorResult.success();
        }
        OAuth2Error err = new OAuth2Error(OAuth2ErrorCodes.INVALID_TOKEN);
        return OAuth2TokenValidatorResult.failure(err);
    }
}
