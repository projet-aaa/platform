<?php
/**
 * Created by PhpStorm.
 * User: stoakes
 * Date: 01/03/17
 * Time: 07:31
 */

namespace AppBundle\Service;


use AppBundle\Entity\McqAnswer;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class McqAnswerValidator extends ConstraintValidator
{

    private $em;

    private $token;

    /**
     * McqAnswerValidator constructor.
     * @param EntityManager $em
     * @param TokenStorageInterface $token To get the current user. Indeed, the author is blamed at persist time
     * and is unavailable at validation time
     */
    public function __construct(EntityManager $em, TokenStorage $token)
    {
        $this->em = $em;
        $this->token = $token;
    }


    /**
     * Validates McqAnswer for multiple and unique question
     * @param mixed $mcqAnswer
     * @param Constraint $constraint
     * @return bool
     */
    public function validate($mcqAnswer, Constraint $constraint)
    {
        if(!$mcqAnswer instanceof McqAnswer){
            $this->context->buildViolation('McqAnswerConsistentConstraint can be applied only on McqAnswer.')
                ->addViolation();
        }


        if($mcqAnswer->getQuestion()->getTypeAnswer() == 'text'){
            return true;
        }

        if($mcqAnswer->getAuthor()){
            $author = $mcqAnswer->getAuthor();
        }
        else{
            $author = $this->token->getToken()->getUser();
        }

        $count = $this->em->getRepository('AppBundle:McqAnswer')
            ->isValidAuthorQuestion($author,$mcqAnswer->getQuestion());


        if ($mcqAnswer->getQuestion()->getTypeAnswer() == 'unique' && $count == 1) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('%type%', $mcqAnswer->getQuestion()->getTypeAnswer())
                ->setParameter('%number%', $count+1)
                ->setParameter('%expected%', 1)
                ->addViolation();

            return false;
        }

        if ($mcqAnswer->getQuestion()->getTypeAnswer() == 'multiple') {
            if($count+1 > $mcqAnswer->getQuestion()->getMcqChoices()->count()) {//more answers than choices
                $this->context->buildViolation($constraint->message)
                    ->setParameter('%type%', $mcqAnswer->getQuestion()->getTypeAnswer())
                    ->setParameter('%number%', $count + 1)
                    ->setParameter('%expected%', 'maximum '.$mcqAnswer->getQuestion()->getMcqChoices()->count())
                    ->addViolation();

                return false;
            }
        }

        return true;
    }
}