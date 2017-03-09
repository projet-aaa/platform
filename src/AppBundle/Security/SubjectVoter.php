<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 31/01/17
 * Time: 15:18
 */

namespace AppBundle\Security;

use AppBundle\Entity\Subject;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class SubjectVoter extends BaseVoter
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

        // only vote on Subject objects inside this voter
        if (!$subject instanceof Subject) {
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

        // you know $subject is a Session object, thanks to supports
        /** @var Subject $oSubject */
        $oSubject = $subject;

        switch ($attribute) {
            case self::CREATE:
                return $this->canCreate($oSubject, $user);
            case self::READ:
                return $this->canRead($oSubject, $user);
            case self::UPDATE:
                return $this->canUpdate($oSubject, $user);
            case self::DELETE:
                return $this->canDelete($oSubject, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    /**
     * Determines if $user can create $subject
     *
     * @param Subject $subject
     * @param User $user
     * @return bool
     */
    private function canCreate(Subject $subject, User $user)
    {
        return in_array('ROLE_PROF', $this->getRolesHierarchy($user->getRoles()));
    }

    /**
     * Determines if $user can read $subject
     *
     * @param Subject $subject
     * @param User $user
     * @return bool
     */
    private function canRead(Subject $subject, User $user)
    {
        return true;
    }

    /**
     * Determines if $user can update $subject
     *
     * @param Subject $subject
     * @param User $user
     * @return bool
     */
    private function canUpdate(Subject $subject, User $user)
    {
        return in_array('ROLE_PROF', $this->getRolesHierarchy($user->getRoles()));
    }

    /**
     * Determines if $user can delete $subject
     *
     * @param Subject $subject
     * @param User $user
     * @return bool
     */
    private function canDelete(Subject $subject, User $user)
    {
        return in_array('ROLE_PROF', $this->getRolesHierarchy($user->getRoles()));
    }
}