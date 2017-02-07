<?php

namespace BeSimple\SsoAuthBundle\Security\Core\Authentication\Provider;


use BeSimple\SsoAuthBundle\Security\Core\Authentication\Token\SsoToken;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\AuthenticationServiceException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use BeSimple\SsoAuthBundle\Security\Core\User\UserFactoryInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

/**
 * Overrides SsoAuthenticationProvider (same namespace) to handle connexion and create
 * User if it is its first connection.
 *
 * Class SsoAuthenticationOverrideProvider
 */
class SsoAuthenticationOverrideProvider extends SsoAuthenticationProvider
{

    public function __construct(UserProviderInterface $userProvider, UserCheckerInterface $userChecker, $createUsers = false, array $createdUsersRoles = array('ROLE_USER'), $hideUserNotFound = true)
    {
        parent::__construct($userProvider, $userChecker, $createUsers, $createdUsersRoles, $hideUserNotFound);
    }

    /**
     * @throws \Symfony\Component\Security\Core\Exception\UsernameNotFoundException
     * @throws \Symfony\Component\Security\Core\Exception\BadCredentialsException
     *
     * @param string $username
     * @param array $attributes
     *
     * @return UserInterface
     */
    protected function provideUser($username, array $attributes = array())
    {
        try {
            $user = $this->retrieveUser($username);
        } catch (UsernameNotFoundException $notFound) {
            if ($this->createUsers && $this->userProvider instanceof UserFactoryInterface) {
                $user = $this->createUser($username, $attributes);
            } elseif ($this->hideUserNotFound) {
                throw new BadCredentialsException('Bad credentials', 0, $notFound);
            } else {
                throw $notFound;
            }
        }

        return $user;
    }

    /**
     * @throws \Symfony\Component\Security\Core\Exception\AuthenticationServiceException
     *
     * @param string $username
     *
     * @return UserInterface
     */
    protected function retrieveUser($username)
    {
        try {
            $user = $this->userProvider->loadUserByUsername($username);
            if (!$user instanceof UserInterface) {
                throw new AuthenticationServiceException('The user provider must return an UserInterface object.');
            }
        } catch (UsernameNotFoundException $notFound) {
            throw $notFound;
        } catch (\Exception $repositoryProblem) {
            throw new AuthenticationServiceException($repositoryProblem->getMessage(), 0, $repositoryProblem);
        }
        return $user;
    }

    /**
     * @throws AuthenticationServiceException
     *
     * @param string $username
     * @param array $attributes
     *
     * @return UserInterface
     */
    protected function createUser($username, array $attributes = array())
    {
        if (!$this->userProvider instanceof UserFactoryInterface) {
            throw new AuthenticationServiceException('UserProvider must implement UserFactoryInterface to create unknown users.');
        }

        try {
            $user = $this->userProvider->createUser($username, $this->createdUsersRoles, $attributes);

            if (!$user instanceof UserInterface) {
                throw new AuthenticationServiceException('The user provider must create an UserInterface object.');
            }
        } catch (\Exception $repositoryProblem) {
            throw new AuthenticationServiceException($repositoryProblem->getMessage(), 0, $repositoryProblem);
        }

        return $user;
    }

    /**
     * @{inheritdoc}
     */
    public function authenticate(TokenInterface $token)
    {
        if (!$this->supports($token)) {
            return null;
        }

        $validation = $token->getManager()->validateCredentials($token->getCredentials());
        if (!$validation->isSuccess()) {
            throw new BadCredentialsException('Authentication has not been validated by SSO provider.');
        }

        $user = $this->provideUser($validation->getUsername(), $validation->getAttributes());

        //remove post auth and pre-auth because we don't really implement useradvancedinterface
        $authenticatedToken = new SsoToken($token->getManager(), $token->getCredentials(), $user, $user->getRoles(), $validation->getAttributes());
        foreach ($token->getAttributes() as $name => $value) {
            if ('sso:validation' == $name) {
                continue;
            }
            $authenticatedToken->setAttribute($name, $value);
        }

        return $authenticatedToken;
    }
}
