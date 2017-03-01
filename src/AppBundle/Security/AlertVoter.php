<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 31/01/17
 * Time: 15:18
 */

namespace AppBundle\Security;

use AppBundle\Entity\Alert;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class AlertVoter extends BaseVoter
{

    /**
     * Determines if the attribute and subject are supported by this voter.
     *
     * @param string $attribute An attribute
     * @param mixed $subject The subject to secure, e.g. an object the user wants to access or any other PHP type
     *
     * @return bool True if the attribute and subject are supported, false otherwise
     */
    protected function supports($attribute, $subject)
    {
        // if the attribute isn't one we support, return false
        if (!in_array($attribute, array(self::CREATE, self::READ, self::UPDATE, self::DELETE))) {
            return false;
        }

        // only vote on Alert objects inside this voter
        if (!$subject instanceof Alert) {
            return false;
        }

        return true;
    }

    /**
     * Perform a single access check operation on a given attribute, subject and token.
     * It is safe to assume that $attribute and $subject already passed the "supports()" method check.
     *
     * @param string $attribute
     * @param mixed $subject
     * @param TokenInterface $token
     *
     * @return bool
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            // the user must be logged in; if not, deny access
            return false;
        }

        // you know $subject is a Alert object, thanks to supports
        /** @var Alert $alert */
        $alert = $subject;

        switch ($attribute) {
            case self::CREATE:
                return $this->canCreate($alert, $user);
            case self::READ:
                return $this->canRead($alert, $user);
            case self::UPDATE:
                return $this->canUpdate($alert, $user);
            case self::DELETE:
                return $this->canDelete($alert, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    /**
     * Determines if $user can create $alert
     *
     * @param Alert $alert
     * @param User $user
     * @return bool
     */
    private function canCreate(Alert $alert, User $user)
    {
        return true;
    }

    /**
     * Determines if $user can read $alert
     *
     * @param Alert $alert
     * @param User $user
     * @return bool
     */
    private function canRead(Alert $alert, User $user)
    {
        return $alert->getAuthor() === $user || in_array('ROLE_ADMIN', $this->getRolesHierarchy($user->getRoles()));
    }

    /**
     * Determines if $user can update $alert
     *
     * @param Alert $alert
     * @param User $user
     * @return bool
     */
    private function canUpdate(Alert $alert, User $user)
    {
        return $alert->getAuthor() === $user || in_array('ROLE_ADMIN', $this->getRolesHierarchy($user->getRoles()));
    }

    /**
     * Determines if $user can delete $alert
     *
     * @param Alert $alert
     * @param User $user
     * @return bool
     */
    private function canDelete(Alert $alert, User $user)
    {
        return $alert->getAuthor() === $user || in_array('ROLE_ADMIN', $this->getRolesHierarchy($user->getRoles()));
    }
}