<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class QuestionAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('text')
            ->add('explication')
            ->add('typeAnswer',ChoiceType::class, array(
                'choices' => array('text','unique','multiple'),
                'choice_label' => function($val){ return $val; },
                ))
            ->add('mcqChoice')
            ->add('textAnswers')
            ->add('test');
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('test')
            ->add('typeAnswer')
            ->add('mcqChoice');
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('id')
            ->add('text')
            ->add('typeAnswer')
            ->add('test');
    }
}
