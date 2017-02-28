<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class AlertAdmin extends AbstractAdmin
{
    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('author')
            ->add('alertType', ChoiceType::class,
                ['label' => 'Alert Type',
                    'choices' => ['tooSlow', 'tooFast', 'good', 'page', 'panic'],
                    'choice_label' => function($val){return $val;}])
            ->add('text')
            ->add('session')
            ->add('createdAt');
    }

    // Fields on which entities can be filtered.
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('author')
            ->add('alertType');
    }

    // Fields that will be displayed in list view
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('id')
            ->add('author')
            ->add('alertType')
            ->add('text')
            ->add('session');
    }
}
