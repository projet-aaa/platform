<?php

namespace BeSimple\SsoAuthBundle\Security\Core\Authentication\Provider;


use AppBundle\Entity\User;
use BeSimple\SsoAuthBundle\Security\Core\Authentication\Token\SsoToken;
use FOS\UserBundle\Doctrine\UserManager;
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

    protected $userManager;

    public function __construct(UserProviderInterface $userProvider, UserCheckerInterface $userChecker,
                                $createUsers = false, array $createdUsersRoles = array('ROLE_USER'), $hideUserNotFound = true,UserManager $userManager)
    {
        parent::__construct($userProvider, $userChecker, $createUsers, $createdUsersRoles, $hideUserNotFound);
        $this->userManager = $userManager;
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
            if ($this->createUsers && $this->userProvider instanceof UserProviderInterface) {
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
        if (!$this->userProvider instanceof UserProviderInterface) {
            throw new AuthenticationServiceException('UserProvider must implement UserProviderInterface to create unknown users.');
        }

        try {
            /* @var User */
            $user = $this->userManager->createUser($username, $this->createdUsersRoles, $attributes);
            $user->setUsername($username);
            $user->setPlainPassword($this->generateRandomString(8));
            $user->setPassword($this->generateRandomString(8));
            $user->setFirstname(substr($username,0,1));
            $user->setLastname(substr($username,1,strlen($username)-1));
            $this->userManager->updateUser($user);
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

    private function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
