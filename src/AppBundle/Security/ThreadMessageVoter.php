<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 31/01/17
 * Time: 15:18
 */

namespace AppBundle\Security;

use AppBundle\Entity\ThreadMessage;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class ThreadMessageVoter extends BaseVoter
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

        // only vote on ThreadMEssage objects inside this voter
        if (!$subject instanceof ThreadMessage) {
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

        // you know $subject is a Thread object, thanks to supports
        /** @var ThreadMessage $threadMessage */
        $threadMessage = $subject;

        switch ($attribute) {
            case self::CREATE:
                return $this->canCreate($threadMessage, $user);
            case self::READ:
                return $this->canRead($threadMessage, $user);
            case self::UPDATE:
                return $this->canUpdate($threadMessage, $user);
            case self::DELETE:
                return $this->canDelete($threadMessage, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    /**
     * Determines if $user can create $threadMessage
     *
     * @param ThreadMessage $threadMessage
     * @param User $user
     * @return bool
     */
    private function canCreate(ThreadMessage $threadMessage, User $user)
    {
        return true;
    }

    /**
     * Determines if $user can read $threadMessage
     *
     * @param ThreadMessage $threadMessage
     * @param User $user
     * @return bool
     */
    private function canRead(ThreadMessage $threadMessage, User $user)
    {
        return true;
    }

    /**
     * Determines if $user can update $threadMessage
     *
     * @param ThreadMessage $threadMessage
     * @param User $user
     * @return bool
     */
    private function canUpdate(ThreadMessage $threadMessage, User $user)
    {
        return $threadMessage->getAuthor() === $user || in_array('ROLE_PROF', $this->getRolesHierarchy($user->getRoles()));
    }

    /**
     * Determines if $user can delete $threadMessage
     *
     * @param ThreadMessage $threadMessage
     * @param User $user
     * @return bool
     */
    private function canDelete(ThreadMessage $threadMessage, User $user)
    {
        return $threadMessage->getAuthor() === $user || in_array('ROLE_PROF', $this->getRolesHierarchy($user->getRoles()));
    }
}