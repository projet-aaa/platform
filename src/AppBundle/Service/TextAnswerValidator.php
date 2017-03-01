<?php
/**
 * Created by PhpStorm.
 * User: stoakes
 * Date: 01/03/17
 * Time: 07:31
 */

namespace AppBundle\Service;


use AppBundle\Entity\McqAnswer;
use AppBundle\Entity\TextAnswer;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class TextAnswerValidator extends ConstraintValidator
{

    private $em;

    private $token;

    /**
     * TextAnswerValidator constructor.
     * @param EntityManager $em
     * @param TokenStorage $token To get the current user. Indeed, the author is blamed at persist time
     * and is unavailable at validation time
     */
    public function __construct(EntityManager $em, TokenStorage $token)
    {
        $this->em = $em;
        $this->token = $token;
    }


    /**
     * Validates TextAnswer for multiple and unique question
     * @param mixed $textAnswer
     * @param Constraint $constraint
     * @return bool
     */
    public function validate($textAnswer, Constraint $constraint)
    {
        if(!$textAnswer instanceof TextAnswer){
            $this->context->buildViolation('TextAnswerValidator can be applied only on TextAnswer.')
                ->addViolation();
        }


        if($textAnswer->getQuestion()->getTypeAnswer() == 'text'){
            return true;
        }

        if($textAnswer->getAuthor()){
            $author = $textAnswer->getAuthor();
        }
        else{
            $author = $this->token->getToken()->getUser();
        }

        $count = $this->em->getRepository('AppBundle:TextAnswer')
            ->isValidAuthorQuestion($author,$textAnswer->getQuestion());


        if ($count >= 1) { //safety >= instead of ==
            $this->context->buildViolation($constraint->message)
                ->addViolation();

            return false;
        }

        return true;
    }
}